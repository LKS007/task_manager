FactoryBot.define do
  factory :task do
    name
    description
    author_id { create :manager }
    assignee_id { create :developer }
  end
end
