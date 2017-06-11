class Catch < ApplicationRecord
  belongs_to :user
  belongs_to :fish
  validates :length, presence: true
  validates :time, presence: true
end
