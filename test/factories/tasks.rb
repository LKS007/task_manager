FactoryBot.define do
  factory :task do
    name { generate :task_name }
    description { generate :description }
    author_id { 1 }
    assignee_id { 1 }
    state { "MyString" }
    expired_at { "2019-01-06" }
  end
end
