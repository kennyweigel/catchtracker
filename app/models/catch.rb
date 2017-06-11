class Catch < ApplicationRecord
  belongs_to :user
  belongs_to :fish
  validates :lat, presence: true
  validates :lng, presence: true
  validates :length, presence: true
  validates :time, presence: true
end
