class Api::PostsController < ApplicationController

  def index
    @posts = Post.includes(:sub, :user).limit(30)
    render :index
  end

  def show
    @post = Post.includes(:sub, :user, {comments: [:user]}).find(params[:id])
    render :show
  end

  def vote(direction)
    @vote = current_user.votes.find_or_create_by(
      votable_id: params[:id],
      votable_type: "Post"
    )

    @vote.value = (@vote.value == direction ? 0 : direction)
    if @vote.save
      @post = @vote.votable
      render :show
    else
      render json: @vote.errors.full_messages
    end
  end

  def upvote
    vote(1)
  end

  def downvote
    vote(-1)
  end

end
