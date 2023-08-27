import _ from 'lodash';

export const openLink = (url: string) => {
  const link = document.createElement('a');
  link.target = `_blank`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const openDownload = (url: string, name: string) => {
  const link = document.createElement('a');
  link.target = `_blank`;
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
