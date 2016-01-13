class Api::PostsController < ApplicationController

  def index
    @posts = params[:sub_id] ? Post.includes(:sub, :user).where(sub_id: params[:sub_id]) : Post.includes(:sub, :user)
    render :index
  end

  def show
    @post = Post.includes(:sub, :user, :comments)find(params[:id])
    render :show
  end
end
