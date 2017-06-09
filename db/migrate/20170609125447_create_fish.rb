class CreateFish < ActiveRecord::Migration[5.1]
  def change
    create_table :fish do |t|
      t.string :name
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
