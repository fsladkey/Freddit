# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  body             :text             not null
#  user_id          :integer          not null
#  commentable_id   :integer          not null
#  commentable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :body, :user_id, :commentable_type, :commentable_id, presence: true

  belongs_to :commentable, polymorphic: true
  belongs_to :user
  has_many :comments, as: :commentable

end
