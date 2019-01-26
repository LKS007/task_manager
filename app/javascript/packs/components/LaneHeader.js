import React from 'react'

export default class LaneHeader extends React.Component {
  render () {
    const {id, cards, total_count} = this.props;
    return <div>
      <b>{id}</b> ({cards.length}/{total_count})
    </div>
  }
}