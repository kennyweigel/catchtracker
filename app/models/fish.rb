class Fish < ApplicationRecord
  acts_as_paranoid
  belongs_to :user
  has_many :catches
  validates :name, presence: true, uniqueness: true
end
