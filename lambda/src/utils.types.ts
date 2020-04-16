export interface Welcome {
    kind: string
    data: WelcomeData
}

export interface WelcomeData {
    after: string
    dist: number
    facets: Facets
    modhash: string
    children: Child[]
    before: null
}

export interface Child {
    kind: Kind
    data: ChildData
}

export interface ChildData {
    approved_at_utc: null
    subreddit: Subreddit
    selftext: string
    author_fullname: string
    saved: boolean
    mod_reason_title: null
    gilded: number
    clicked: boolean
    title: string
    link_flair_richtext: any[]
    subreddit_name_prefixed: SubredditNamePrefixed
    hidden: boolean
    pwls: number
    link_flair_css_class: null
    downs: number
    thumbnail_height: null
    hide_score: boolean
    name: string
    quarantine: boolean
    link_flair_text_color: LinkFlairTextColor
    author_flair_background_color: null
    subreddit_type: SubredditType
    ups: number
    total_awards_received: number
    media_embed: Facets
    thumbnail_width: null
    author_flair_template_id: null
    is_original_content: boolean
    user_reports: any[]
    secure_media: null
    is_reddit_media_domain: boolean
    is_meta: boolean
    category: null
    secure_media_embed: Facets
    link_flair_text: null
    can_mod_post: boolean
    score: number
    approved_by: null
    author_premium: boolean
    thumbnail: PostHint
    edited: boolean | number
    author_flair_css_class: null
    author_flair_richtext: any[]
    gildings: Gildings
    content_categories: null
    is_self: boolean
    mod_note: null
    created: number
    link_flair_type: FlairType
    wls: number
    removed_by_category: null
    banned_by: null
    author_flair_type: FlairType
    domain: Domain
    allow_live_comments: boolean
    selftext_html: null | string
    likes: null
    suggested_sort: null
    banned_at_utc: null
    view_count: null
    archived: boolean
    no_follow: boolean
    is_crosspostable: boolean
    pinned: boolean
    over_18: boolean
    all_awardings: AllAwarding[]
    awarders: any[]
    media_only: boolean
    can_gild: boolean
    spoiler: boolean
    locked: boolean
    author_flair_text: null
    treatment_tags: any[]
    visited: boolean
    removed_by: null
    num_reports: null
    distinguished: null
    subreddit_id: SubredditID
    mod_reason_by: null
    removal_reason: null
    link_flair_background_color: string
    id: string
    is_robot_indexable: boolean
    report_reasons: null
    author: string
    discussion_type: null
    num_comments: number
    send_replies: boolean
    whitelist_status: WhitelistStatus
    contest_mode: boolean
    mod_reports: any[]
    author_patreon_flair: boolean
    author_flair_text_color: null
    permalink: string
    parent_whitelist_status: WhitelistStatus
    stickied: boolean
    url: string
    subreddit_subscribers: number
    created_utc: number
    num_crossposts: number
    media: null
    is_video: boolean
    post_hint?: PostHint
    preview?: Preview
}

export interface AllAwarding {
    giver_coin_reward: null
    subreddit_id: null
    is_new: boolean
    days_of_drip_extension: number
    coin_price: number
    id: string
    penny_donate: null
    coin_reward: number
    icon_url: string
    days_of_premium: number
    icon_height: number
    resized_icons: ResizedIcon[]
    icon_width: number
    start_date: null
    is_enabled: boolean
    description: string
    end_date: null
    subreddit_coin_reward: number
    count: number
    name: string
    icon_format: null
    award_sub_type: string
    penny_price: null
    award_type: string
}

export interface ResizedIcon {
    url: string
    width: number
    height: number
}

export enum FlairType {
    Text = 'text',
}

export enum Domain {
    SelfDadjokes = 'self.dadjokes',
}

export interface Gildings {
    gid_1?: number
    gid_2?: number
}

export enum LinkFlairTextColor {
    Dark = 'dark',
}

export interface Facets {}

export enum WhitelistStatus {
    AllAds = 'all_ads',
}

export enum PostHint {
    Self = 'self',
    Spoiler = 'spoiler',
}

export interface Preview {
    images: Image[]
    enabled: boolean
}

export interface Image {
    source: ResizedIcon
    resolutions: ResizedIcon[]
    variants: Facets
    id: string
}

export enum Subreddit {
    Dadjokes = 'dadjokes',
}

export enum SubredditID {
    T52T0No = 't5_2t0no',
}

export enum SubredditNamePrefixed {
    RDadjokes = 'r/dadjokes',
}

export enum SubredditType {
    Public = 'public',
}

export enum Kind {
    T3 = 't3',
}
