export function getPaginationItems(
  currentPage: number,
  lastPage: number,
  maxLength: number
) {
  const resultArray: Array<number> = [];

  // length is less than max length
  if (currentPage <= maxLength) {
    for (let index = 1; index <= lastPage; index++) {
      resultArray.push(index);
    }
  }

  // handle ellipse ...logic
  else {
    const firstPage = 1;
    const confirmedPagesCount = 3; // first,current and last page
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = deductedMaxLength / 2;

    //   handle ellipse in the middle => [1, 2, 3, ..., 8, 9, 10]
    if (
      currentPage - firstPage < sideLength ||
      lastPage - currentPage < sideLength
    ) {
      for (let index = 1; index <= sideLength + firstPage; index++) {
        resultArray.push(index);
      }
      resultArray.push(NaN);

      for (let index = lastPage - sideLength; index <= lastPage; index++) {
        resultArray.push(index);
      }
    }

    //   handle ellipse on both side => [1, ..., 4, 5, 6, ..., 10]
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      resultArray.push(1);
      resultArray.push(NaN);

      const deductedSideLength = sideLength - 1;

      for (
        let index = currentPage - deductedSideLength;
        index < currentPage + deductedSideLength + 1;
        index++
      ) {
        resultArray.push(index);
      }

      resultArray.push(NaN);
      resultArray.push(lastPage);
    }

    // handle ellipse ... not in the middle, either on one side  => [1, 2, 3, 4, ..., 9, 10]
    else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let index = 1; index <= currentPage + 1; index++) {
          resultArray.push(index);
          remainingLength--;
        }
        resultArray.push(NaN);
        remainingLength--;

        for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
          resultArray.push(n);
        }
      } else {
        for (let index = lastPage; index >= currentPage - 1; index--) {
          resultArray.unshift(index);
          remainingLength--;
        }
        resultArray.unshift(NaN);
        remainingLength--;

        for (let p = remainingLength; p >= 1; p--) {
          resultArray.unshift(p);
        }
      }
    }
  }

  return resultArray;
}
