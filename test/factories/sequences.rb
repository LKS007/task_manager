FactoryBot.define do
  sequence :email do |n|
    "email#{n}@factory.com"
  end
  sequence :string do |n|
    "string#{n}"
  end
  sequence(:name, aliases: [:first_name, :last_name]) do |n|
    "some_name_#{n}"
  end
  sequence :description do |n|
    "short description #{n}"
  end
  sequence :password do |n|
    "password#{n}"
  end
end