import { ErrorHandler, RequestHandler, SkillBuilders, getRequestType, getIntentName, getSlotValue } from 'ask-sdk-core'
import { SessionEndedRequest } from 'ask-sdk-model'

import { getJoke } from './jokeUtils/jokeUtils'

const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    },
    handle(handlerInput) {
        const speakOutput = 'Hi! Ready to hear a fantasic joke?'
        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse()
    },
}
const GeneralJokeIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return (
            getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            getIntentName(handlerInput.requestEnvelope) === 'GeneralJokeIntent'
        )
    },
    async handle(handlerInput) {
        const joke = await getJoke()
        if (joke)
            return handlerInput.responseBuilder
                .speak(`${joke.question} ${joke.answer}`)
                .reprompt('want to hear another?')
                .getResponse()
        return handlerInput.responseBuilder.speak(`I'm not feeling it right now. Ask me again later.`).getResponse()
    },
}

const SpecificJokeIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return (
            getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            getIntentName(handlerInput.requestEnvelope) === 'SpecificJokeIntent'
        )
    },
    async handle(handlerInput) {
        const requestEnvelope = handlerInput.requestEnvelope
        const slot = getSlotValue(requestEnvelope, 'topic')
        const joke = await getJoke(slot)
        if (joke)
            return handlerInput.responseBuilder
                .speak(`${joke.question} ${joke.answer}`)
                .reprompt('want to hear another?')
                .getResponse()
        return handlerInput.responseBuilder
            .speak(`I don't know that one. Ask me again.`)
            .reprompt('want to hear another?')
            .getResponse()
    },
}

const HelpIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return (
            getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
        )
    },
    handle(handlerInput) {
        const speakOutput = 'Howdi!'

        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse()
    },
}
const CancelAndStopIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return (
            getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
                getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent')
        )
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!'
        return handlerInput.responseBuilder.speak(speakOutput).getResponse()
    },
}
const SessionEndedRequestHandler: RequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest'
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        console.log(
            `Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`
        )
        return handlerInput.responseBuilder.getResponse()
    },
}

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler: RequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    },
    handle(handlerInput) {
        const intentName = getIntentName(handlerInput.requestEnvelope)
        const speakOutput = `You just triggered ${intentName}`

        return (
            handlerInput.responseBuilder
                .speak(speakOutput)
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse()
        )
    },
}

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler: ErrorHandler = {
    canHandle() {
        return true
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`)
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`

        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse()
    },
}

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GeneralJokeIntentHandler,
        SpecificJokeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(ErrorHandler)
    .lambda()
