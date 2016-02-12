class Api::PostsController < ApplicationController

  def index
    @posts = Post.includes(:sub, :user).limit(30)
    render :index
  end

  def show
    @post = Post.includes(:sub, :user, {comments: [:user]}).find(params[:id])
    render :show
  end
end
