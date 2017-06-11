class Fish < ApplicationRecord
  belongs_to :user
  has_many :catches
  validates :name, presence: true, uniqueness: true
end
