FactoryGirl.define do

  factory :user do
    username { Faker::Internet.user_name }
    email { Faker::Internet.email }
    password "password"
  end

end
