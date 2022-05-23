const Page = require("./page");

class TagNewPage extends Page {
  get nameInput() {
    return "input#tag-name";
  }

  get descriptionInput() {
    return "textarea#tag-description";
  }

  get metadataTitleInput() {
    return "input#meta-title";
  }

  get metadataDescriptionInput() {
    return "textarea#meta-description";
  }

  get metadataCanonicalUrlInput() {
    return "input#canonical-url";
  }

  get twitterTitleInput() {
    return "input#twitter-title";
  }
  
  get twitterDescriptionInput() {
    return "textarea#twitter-description";
  }

  get metadataButton() {
    return "button[class='gh-btn gh-btn-expand'] >> nth=0";
  }

  get twitterCardButton() {
    return "button[class='gh-btn gh-btn-expand'] >> nth=1";
  }

  get facebookCardButton() {
    return "button[class='gh-btn gh-btn-expand'] >> nth=2";
  }

  get codeInjectionButton() {
    return "button[class='gh-btn gh-btn-expand'] >> nth=3";
  }

  get saveButton() {
    return "section.view-actions button";
  }

  get errorMessage() {
    return "span.error";
  }

  get metadataTitleError() {
    return "p:below(input#meta-title) >> nth=0";
  }

  get metadataDescriptionError() {
    return "p:below(textarea#meta-description) >> nth=0";
  }

  get metadataCanonicalUrlError() {
    return "p:below(input#canonical-url) >> nth=0";
  }

  get twitterError() {
    return "div.gh-alert-content >> nth=0";
  }  
}

module.exports = new TagNewPage();
