FactoryGirl.define do

  factory :sub do
    title { [Faker::Hipster.word, Faker::Hacker.noun].sample }
    description { [Faker::Hacker.say_something_smart, Faker::Hipster.paragraph].sample }
  end
end
