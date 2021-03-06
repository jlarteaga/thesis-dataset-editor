# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

## [1.0.2]

### Changed

- Replaced default divs by mat-expansion-panels.

## [1.0.1]

### Added

- Added restrictions to request a text processing when the text has not been reviewed.
- Added navigation from a student answer to its question.

## [1.0.0]

### Added

- Question's home view.
- Student Answer's home view.

### Changed

- Replaced with MatExpansionPanels the rendering elements of sentences in freeling display component.

## [0.2.2]

### Added

- Added single student answer view.
- Added similarity matrices component.

### Changed

- Small navigation fixes

## [0.2.1]

### Changed

- Improved some visual details in all views.

## [0.2.0]

### Added

- Added single question view.
- Added freeling display component.

## [0.1.3]

### Fixed student-answer translation component showing the rawStatement of the question instead of its sentStatement.

## [0.1.2]

### Added

- Added behavior to force login if an unauthorized response is received.

### Changed

- When textarea is focused, the cursor moves to the first letter (the standard behavior was to move to the end of the
  text).

## [0.1.1]

### Changed

- Changed behavior of SutdentAnswerTranslation and set focus to sanitize button when 'next' or 'previous' buttons are
  clicked.
- Improved sanitization.

## [0.1.0]

### Added

- Added authentication management.
- Added translation section to view all the translation units (question and student-answers).
- Added component to translate questions.
- Added component to translate student answers.
- Added small button to sanitize some common issues.

[Unreleased]: https://github.com/jlarteaga/thesis-dataset-editor/compare/1.0.2...develop

[1.0.2]: https://github.com/jlarteaga/thesis-dataset-editor/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/jlarteaga/thesis-dataset-editor/compare/1.0.0...1.0.1

[1.0.0]: https://github.com/jlarteaga/thesis-dataset-editor/compare/0.2.2...1.0.0

[0.2.2]: https://github.com/jlarteaga/thesis-dataset-editor/compare/0.2.1...0.2.2

[0.2.1]: https://github.com/jlarteaga/thesis-dataset-editor/compare/0.2.0...0.2.1

[0.2.0]: https://github.com/jlarteaga/thesis-dataset-editor/compare/0.1.2...0.2.0

[0.1.2]: https://github.com/jlarteaga/thesis-dataset-editor/compare/0.1.1...0.1.2

[0.1.1]: https://github.com/jlarteaga/thesis-dataset-editor/compare/0.1.0...0.1.1

[0.1.0]: https://github.com/jlarteaga/thesis-dataset-editor/releases/tag/0.1.0
