class Api::SubsController < ApplicationController

  def index
    @subs = Sub.all
    render json: @subs
  end

end
