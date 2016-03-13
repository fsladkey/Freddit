FactoryGirl.define do

  factory :post do
    title { ["#{Faker::Hacker.noun} #{Faker::Hacker.ingverb}", Faker::Hipster.sentence].sample }
    body { [Faker::Hacker.say_something_smart, Faker::Hipster.paragraph].sample }
    user_id 1
    sub_id 1
  end
end
