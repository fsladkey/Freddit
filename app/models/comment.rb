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
  validates :body, :user_id, :post_id, presence: true

  belongs_to :comment
  belongs_to :post
  belongs_to :user
  has_many :child_comments, class_name: "Comment", foreign_key: :parent_comment_id

end
