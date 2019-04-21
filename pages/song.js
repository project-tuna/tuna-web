import React, {Component} from 'react'
import {withRouter} from 'next/router'
import Vibrant from 'node-vibrant'
import SONGS from '../constants/songs'
import './song.css'

@withRouter
export default class Song extends Component {
  state = {
    mutedColor: '#ffffff',
    vibrantColor: '#eeeeee',
    song: null,
  }
  componentDidMount() {
    const {
      router: {
        query: {id},
      },
    } = this.props
    const song = SONGS.find(({id: songId}) => songId === Number(id))

    if (!song) {
      return
    }

    this.setState({song})
    const {
      album: {cover},
    } = song

    Vibrant.from(cover)
      .getPalette()
      .then(palette => {
        this.setState({
          mutedColor: palette.DarkMuted.hex,
          vibrantColor: palette.LightVibrant.hex,
        })
      })
  }

  render() {
    const {mutedColor, vibrantColor, song} = this.state

    if (!song) {
      return null
    }

    const {
      name,
      artist,
      album: {name: albumName, cover},
    } = song

    return (
      <div className="Song Container">
        <div className="Song-Info">
          <div className="Song-coverWrapper">
            <img src={cover} className="Song-cover" />
          </div>
          <div className="Song-name">
            <div
              className="Song-nameBackground"
              style={{background: vibrantColor}}
            />
            <span>{name}</span>
          </div>
          <div className="Song-subInfo">
            <div
              className="Song-subInfoBackground"
              style={{background: mutedColor}}
            />
            <span>
              {artist} {albumName}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
