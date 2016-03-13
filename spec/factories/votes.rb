FactoryGirl.define do

  factory :vote do
    value { [1, -1].sample }
    user_id 1
    votable_id 1
    factory :comment_vote do
      votable_type "Comment"
    end
    factory :post_vote do
      votable_type "Post"
    end
  end

end
