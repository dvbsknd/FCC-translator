export default function HTMLHighlight () {};

HTMLHighlight.prototype.highlight = function (string, words) {
  console.log(string, words);
  let highlighted = string;
  words.forEach(word => {
    const regex = new RegExp(word);
    highlighted = highlighted.replace(regex, '<span class="highlight">$&</span>');
  });
  return highlighted;
};
