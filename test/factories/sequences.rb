FactoryBot.define do
  sequence :email do |n|
    "email#{n}@factory.com"
  end
  sequence :string do |n|
    "string#{n}"
  end
  sequence :task_name do |n|
    "task_name_#{n}"
  end
  sequence :description do |n|
    "short description #{n}"
  end
end