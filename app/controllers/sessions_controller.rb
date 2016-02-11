class SessionsController < Devise::SessionsController
  before_filter :configure_permitted_parameters
  respond_to :json

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_in) do |u|
      u.permit(:username, :email)
    end
  end

end
