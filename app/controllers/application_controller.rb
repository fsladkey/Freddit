class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  # before_filter :configure_permitted_parameters, if: :devise_controller?

  private

end
