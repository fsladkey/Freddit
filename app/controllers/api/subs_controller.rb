class Api::SubsController < ApplicationController

  def index
    @subs = Sub.all
    render json: @subs
  end

  def show
    @sub = Sub.includes(posts: [:user]).find_by(title: params[:id])
    render :show
  end

end
