# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  email           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  session_token   :string
#

class User < ActiveRecord::Base
  attr_reader :password
  after_initialize :ensure_session_token

  validates :username, :email, :password_digest, presence: true
  validates :username, :email, uniqueness: true

  has_many :posts

  has_many :moderations

  has_many(
    :moderated_subs,
    through: :moderations,
    source: :sub
  )

  def self.random_digest
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password).is_password?(password)
  end

  private

  def ensure_session_token
    return session_token if session_token
    loop do
      session_token = User.random_digest
      unless User.exists?(session_token: session_token)
        update(session_token: session_token)
        return self.session_token
      end
    end
  end

end
