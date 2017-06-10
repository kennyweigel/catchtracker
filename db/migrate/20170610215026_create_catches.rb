class CreateCatches < ActiveRecord::Migration[5.1]
  def change
    create_table :catches do |t|
      t.integer :length
      t.datetime :time
      t.text :notes
      t.references :user, foreign_key: true
      t.references :fish, foreign_key: true

      t.timestamps
    end
  end
end
