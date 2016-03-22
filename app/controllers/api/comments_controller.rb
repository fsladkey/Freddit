class Api::CommentsController < ApplicationController

  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy!
    render :show
  end

  def vote(direction)
    @vote = current_user.votes.find_or_create_by(
      votable_id: params[:id],
      votable_type: "Comment"
    )
    @vote.value = (@vote.value == direction ? 0 : direction)

    if @vote.save
      @comment = Comment.includes(:sub, :user, :votes).find(@vote.votable_id)
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


  private

  def comment_params
    params.require(:comment).permit(:body, :parent_comment_id, :post_id)
  end

end
