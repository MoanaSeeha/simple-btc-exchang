# frozen_string_literal: true

# Root AR
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
