import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {commentsList: [], name: '', comments: ''}

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({commentsList: commentsList.filter(each => each.id !== id)})
  }

  toggleOnClickLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentInform = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentsDetails={eachComment}
        toggleOnClickLike={this.toggleOnClickLike}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onClickAddComment = event => {
    event.preventDefault()
    const {name, comments} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comments,
      isLiked: false,
      date: new Date(),
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comments: '',
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comments: event.target.value})
  }

  render() {
    const {name, comments, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>

          <div className="comments-inputs">
            <form className="form" onSubmit={this.onClickAddComment}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>
              <input
                value={name}
                onChange={this.onChangeName}
                type="search"
                placeholder="Your Name"
                className="name-input"
              />
              <textarea
                value={comments}
                onChange={this.onChangeComment}
                rows="6"
                placeholder="Your Comment"
                className="comment-input"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <hr className="line" />

          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>{' '}
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentInform()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
