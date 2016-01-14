User.destroy_all
fred = User.create!(username: "Fred", email: "fred@fred.com", password: "fredfred", password_confirmation: "fredfred")
lily = User.create!(username: "Lily", email: "lily@lily.com", password: "lilylily", password_confirmation: "lilylily")
carl = User.create!(username: "Carl", email: "carl@carl.com", password: "carlcarl", password_confirmation: "carlcarl")
tommy = User.create!(username: "Tommy", email: "tommy@tommy.com", password: "tommytommy", password_confirmation: "tommytommy")
jonathan = User.create!(username: "Jonathan", email: "jonathan@jonathan.com", password: "jonathanjonathan", password_confirmation: "jonathanjonathan")
sennnacy = User.create!(username: "Sennacy", email: "sennacy@sennacy.com", password: "sennacysennacy", password_confirmation: "sennacysennacy")
firetrux = User.create!(username: "Firetrux", email: "firetrux@firetrux.com", password: "firetruxfiretrux", password_confirmation: "firetruxfiretrux")

50.times do
  name = Faker::Internet.user_name
  email = Faker::Internet.email
  user = User.new(username: name, email: email, password: "password", password_confirmation: "password")
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

22.times do
  new_sub = User.all.sample.moderated_subs.new(
    title: [Faker::Hipster.word, Faker::Hacker.noun].sample,
    description: [Faker::Hacker.say_something_smart, Faker::Hipster.paragraph].sample
    )
  redo unless new_sub.valid?
  new_sub.save!
end

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
500.times do
  title = ["#{Faker::Hacker.noun} #{Faker::Hacker.ingverb}", Faker::Hipster.sentence].sample
  body = [Faker::Hacker.say_something_smart, Faker::Hipster.paragraph].sample
  Post.create!(
    user_id: User.pluck(:id).sample,
    sub_id: Sub.pluck(:id).sample,
    title: title,
    body: body
  )
end

Comment.destroy_all
1000.times do
  post = (Post.all).sample
  parent_comment_id = [Comment.pluck(:id).sample, nil].sample
  body = [Faker::Hacker.say_something_smart, Faker::Hipster.paragraph].sample
  post.comments.create!(
    body: body,
    user_id: User.pluck(:id).sample,
    parent_comment_id: parent_comment_id
  )
end
