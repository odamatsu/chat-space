FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/uploads/message/image/2/Screen_Shot_2018-01-28_at_20.39.50.png")
    user
    group
  end
end
