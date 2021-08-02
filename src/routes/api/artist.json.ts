import BaseContext from '$lib/context'
import { parseArtistPage } from '$lib/js/artistUtils'

export async function get({ query }) {
	// if (headers.origin !== "https://beatbump.ml/") { return { status: 400, body: JSON.stringify('CORS error!') } }

	const browseId = query.get('browseId')
	// console.log(endpoint)
	try {
		const response = await fetch(
			`https://music.youtube.com/youtubei/v1/browse?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30`,
			{
				method: 'POST',
				body: JSON.stringify({
					...BaseContext,
					browseEndpointContextMusicConfig: {
						browseEndpointContextMusicConfig: {
							pageType: 'MUSIC_PAGE_TYPE_ARTIST'
						}
					},
					browseId: `${browseId}`
				}),
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					Origin: 'https://music.youtube.com',
					'User-Agent':
						'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
				}
			}
		)

		// if (!response.ok) {
		// 	// NOT res.status >= 200 && res.status < 300
		// 	return { status: response.status, body: response.statusText }
		// }
		const data = await response.json()
		const {
			header,

			contents: {
				singleColumnBrowseResultsRenderer: {
					tabs: [
						{
							tabRenderer: {
								content: { sectionListRenderer: { contents = [] } = {} } = {}
							} = {}
						} = {}
					] = []
				} = {}
			} = {}
		} = data

		const carouselItems = []
		const thumbnail = []
		let description = ''
		let items = []
		// console.log(contents)
		let headerContent = []
		const parse = async (header, contents) => {
			const newData = [
				parseArtistPage(header?.musicImmersiveHeaderRenderer, contents)
			]
			// console.log(newData)

			return newData.map((d) => {
				// console.log(d)
				carouselItems.push([...d.carouselItems])
				headerContent.push(d[0])
				if (d[0]) {
					d[0].thumbnails?.forEach((h) => {
						thumbnail.push(h)
					})
				}
				if (d?.songs) {
					items = [...d.songs]
				} else {
					items = undefined
				}
				description = d[0].description.split('.')

				// console.log(headerContent, d, description, items)
				return { headerContent, items }
			})
		}
		const body = await parse(header, contents)
		// console.log(data)
		if (carouselItems.length >= 0) {
			return {
				status: 200,
				body: {
					body,
					carouselItems: carouselItems[0],
					headerContent: headerContent[0],
					description,
					thumbnail,
					items
				}
			}
		}
	} catch (err) {
		console.log(err)
		throw new Error(err)
	}
}