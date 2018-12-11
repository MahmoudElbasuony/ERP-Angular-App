export function CopyObject(source: Object, target: Object) {

  if (!source) throw Error('Source is null');

  if (!target) throw Error('Target is null');


  target = JSON.parse(JSON.stringify(source));

}



export function BrowserPopup(url, title, w, h) {

  const left = (screen.width / 2) - (w / 2);
  const top = (screen.height / 2) - (h / 2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

}
