class Api::PostsController < ApplicationController

  def index
    @posts = params[:sub_id] ? Post.includes(:sub).where(sub_id: params[:sub_id]) : Post.includes(:sub)
    render :index
  end
end
