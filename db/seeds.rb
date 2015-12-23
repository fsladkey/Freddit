User.destroy_all
fred = User.create!(username: "Fred", email: "fred@fred.com", password: "fredfred")
lily = User.create!(username: "Lily", email: "lily@lily.com", password: "lilylily")
carl = User.create!(username: "Carl", email: "carl@carl.com", password: "carlcarl")
tommy = User.create!(username: "Tommy", email: "tommy@tommy.com", password: "tommytommy")
jonathan = User.create!(username: "Jonathan", email: "jonathan@jonathan.com", password: "jonathanjonathan")
sennnacy = User.create!(username: "Sennacy", email: "sennacy@sennacy.com", password: "sennacysennacy")
firetrux = User.create!(username: "Firetrux", email: "firetrux@firetrux.com", password: "firetruxfiretrux")

50.times do
  name = Faker::Name.first_name
  email = Faker::Internet.email
  user = User.new(username: name, email: email, password: "password")
  redo unless user.valid?
  user.save!
end

Sub.destroy_all
cats = Sub.create!(title: "cats", description: "This is a subfreddit all about cats. Cats cats cats.")
dogs = Sub.create!(title: "dogs", description: "Dogs are great! Don't you like dogs?")
ruby = Sub.create!(title: "ruby", description: "For all your Ruby needs!")
java = Sub.create!(title: "java", description: "Serious languages only within. No scripts please.")
cplusplus = Sub.create!(title: "c++", description: "If you don't already know the answer, we can't possibly be bothered to help you.")
python = Sub.create!(title: "python", description: "Is this a subfreddit for snakes or the programming language? Does it matter?.")
javascript = Sub.create!(title: "javascript", description: "Abandon all hope, ye who enter here.")
app_academy = Sub.create!(title: "appacademy", description: "Learn all the things!")

Moderation.destroy_all
Moderation.create!(user_id: fred.id, sub_id: python.id)
Moderation.create!(user_id: jonathan.id, sub_id: ruby.id)
Moderation.create!(user_id: carl.id, sub_id: cplusplus.id)
Moderation.create!(user_id: lily.id, sub_id: java.id)
Moderation.create!(user_id: tommy.id, sub_id: javascript.id)
Moderation.create!(user_id: jonathan.id, sub_id: app_academy.id)
Moderation.create!(user_id: tommy.id, sub_id: app_academy.id)
Moderation.create!(user_id: lily.id, sub_id: app_academy.id)
Moderation.create!(user_id: carl.id, sub_id: app_academy.id)
Moderation.create!(user_id: fred.id, sub_id: app_academy.id)

Post.destroy_all
100.times do
  Post.create!(user_id: User.pluck(:id).sample, sub_id: Sub.pluck(:id).sample, title: "#{Faker::Hacker.noun} #{Faker::Hacker.ingverb}", body: Faker::Hacker.say_something_smart)
end
