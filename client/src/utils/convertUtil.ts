import _ from 'lodash'

export const convertVietnameseToEnglish = (text: string) => {
  if (text) {
    text = text.toLowerCase()
    text = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    text = text.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    text = text.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    text = text.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    text = text.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    text = text.replace(/đ/g, 'd')
    text = text.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
    text = text.replace(/\u02C6|\u0306|\u031B/g, '')
  }
  return text
}

export const convertFullNameToImageName = (fullName: string) => {
  const allNames = convertVietnameseToEnglish(fullName)
    .replace(/[^A-Za-z0-9À-ÿ ]/gi, '')
    .replace(/ +/gi, ' ')
    .trim()
    .split(' ')

  const result = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0)?.toUpperCase()}`
    }
    return acc
  }, '')

  return result
}

export const covertObjectToBinary = (obj: any) => {
  let output = ''
  const input = JSON.stringify(obj) // convert the json to string.
  // loop over the string and convert each charater to binary string.
  for (let i = 0; i < input.length; i++) {
    output += input[i].charCodeAt(0).toString(2) + ' '
  }
  return output.trimEnd()
}

export const convertSkillListFormat = (list: any[]) => {
  const skillList = _.map(list, (item, index) => {
    return {
      skill: {
        ...item,
      },
      skillId: item?.id,
    }
  })
  return skillList
}

export const convertCategoryListFormat = (list: any[]) => {
  const categoryList = _.map(list, (item, index) => {
    return {
      category: {
        ...item,
      },
      categoryId: item?.id,
    }
  })
  return categoryList
}
