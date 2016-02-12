class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  helper_method :current_user, :signed_in?

  # before_filter :configure_permitted_parameters, if: :devise_controller?

  private

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
    @current_user
  end

  def signed_in?
    !!@current_user
  end

  def sign_in!(user)
    session[:session_token] = user.reset_session_token!
  end

  def sign_out!
    current_user.reset_session_token!
    session[:session_token] = nil
  end



end
