// Generated by https://quicktype.io

export interface IListItemRenderer {
	subtitle: Subtitle[]
	artistInfo: ArtistInfo
	explicit: boolean
	title: string
	aspectRatio: string
	playerParams?: string
	playlistSetVideoId?: string
	musicVideoType?: string
	length?: string
	videoId: string
	playlistId: string
	thumbnails: Thumbnail[]
}

interface ArtistInfo {
	artist: Subtitle[]
}

interface Subtitle {
	text: string
	navigationEndpoint?: NavigationEndpoint
}

interface NavigationEndpoint {
	clickTrackingParams: string
	browseEndpoint: BrowseEndpoint
}

interface BrowseEndpoint {
	browseId: string
	browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs
}

interface BrowseEndpointContextSupportedConfigs {
	browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig
}

interface BrowseEndpointContextMusicConfig {
	pageType: string
}

interface Thumbnail {
	url: string
	width: number
	height: number
	placeholder: string
}