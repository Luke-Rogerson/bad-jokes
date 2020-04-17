import { ErrorHandler, RequestHandler, SkillBuilders, getRequestType, getIntentName, getSlotValue } from 'ask-sdk-core'

import { getJoke } from './jokeUtils/jokeUtils'
import { intro, slotName, reprompt, help, bye, jokeSearchError, generalJokeError, generalError } from './constants'

const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak(intro).reprompt(intro).getResponse()
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
                .reprompt(reprompt)
                .getResponse()
        return handlerInput.responseBuilder.speak(generalJokeError).getResponse()
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
        const slot = getSlotValue(requestEnvelope, slotName)
        const joke = await getJoke(slot)
        if (joke)
            return handlerInput.responseBuilder
                .speak(`${joke.question} ${joke.answer}`)
                .reprompt(reprompt)
                .getResponse()
        return handlerInput.responseBuilder.speak(jokeSearchError).reprompt(reprompt).getResponse()
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
        return handlerInput.responseBuilder.speak(help).reprompt(help).getResponse()
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
        return handlerInput.responseBuilder.speak(bye).getResponse()
    },
}
const SessionEndedRequestHandler: RequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest'
    },
    handle(handlerInput) {
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
    handle(handlerInput) {
        return handlerInput.responseBuilder.speak(generalError).getResponse()
    },
}

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
