# == Schema Information
#
# Table name: subs
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Sub < ActiveRecord::Base
  validates :title, :description, presence: true
  validates :title, uniqueness: true

  has_many :posts

  has_many :moderations

  has_many(
    :moderators,
    through: :moderations,
    source: :user
  )

end
