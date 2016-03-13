FactoryGirl.define do

  factory :comment do
    body { [Faker::Hacker.say_something_smart, Faker::Hipster.paragraph].sample }
    user_id 1
    post_id 1
  end
end
