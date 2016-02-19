class Api::CommentsController < ApplicationController

  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end


  private

  def comment_params
    params.require(:comment).permit(:body, :parent_comment_id, :post_id)
  end

end
