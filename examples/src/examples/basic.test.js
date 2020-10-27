import { calculate } from './calculate';
import * as addModule from './add';

describe('basic jest examples', () => {
  it('determines whether two values are the same value', () => {
    expect('bratislava').toBe('bratislava');
  });

  it('determines whether two objects/arrays are same', () => {
    const towns = ['kosice', 'bratislava', 'bystrica'].sort();
    expect(towns).toEqual(['bratislava', 'bystrica', 'kosice']);
  });

  it('determines whether value is valid email address', () => {
    expect('test@email.com').toMatch(
      /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    );
  });

  it('checks truthiness', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  it('fails', () => {
    expect(fail).toThrow();
  });

  function fail() {
    throw new Error('Nasty error');
  }

  it.skip('not fails', () => {
    expect(notFail).not.toThrow();
  });

  it('not fails and shallows error', () => {
    const errorMock = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});
    expect(notFail).not.toThrow();
    expect(errorMock).toBeCalledTimes(2);
    jest.restoreAllMocks();
  });

  function notFail() {
    try {
      fail();
    } catch (error) {
      console.error(error);
      console.error(error);
    }
  }

  test.each`
    x     | y    | result
    ${0}  | ${1} | ${1}
    ${1}  | ${1} | ${2}
    ${-1} | ${1} | ${0}
  `('$x + $y = $result', ({ x, y, result }) => {
    expect(x + y).toBe(result);
  });
});

describe('testing async', () => {
  it('is slivkovy lekvar', done => {
    function callback(data) {
      expect(data).toBe('slivkovy lekvar');
      done();
    }

    fetchData(callback);
  }, 10); // tiemout (default is 5000)

  function fetchData(callback) {
    setTimeout(() => {
      callback('slivkovy lekvar');
    }, 1);
  }

  it('is more slivkovy lekvar', () => {
    return fetchDataPromise().then(data => {
      expect(data).toBe('slivkovy lekvar');
    });
  });

  function fetchDataPromise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('slivkovy lekvar');
      }, 1);
    });
  }

  it('is much more slivkovy lekvar', async () => {
    const data = await fetchDataPromise();
    expect(data).toBe('slivkovy lekvar');
  });
});

//medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c

describe('mocking external module', () => {
  it('calculate', () => {
    const addMock = jest.spyOn(addModule, 'add');
    addMock.mockReturnValueOnce(4);
    const result = calculate(1, 1);
    expect(result).toBe(4);
    expect(addMock).toHaveBeenCalledWith(1, 1);
  });
});

// spyon doesn't work for reexported functions index.js (https://stackoverflow.com/questions/53162001/typeerror-during-jests-spyon-cannot-set-property-getrequest-of-object-which)
// in that case we can mock the whole module with  
// as a second argument we can provide the mocked module
// test.mock('./add', { add: jest.fn() });
// also note that the add module is mocked only for this test file https://stackoverflow.com/questions/56496998/how-to-restore-a-mock-created-with-jest-mock
// and it is also hoisted by babel and moved before all imports at the top of the file
jest.mock('./add');

describe('mocking external module 2', () => {
  it('calculate', () => {
    const addMock = jest.spyOn(addModule, 'add');
    addMock.mockReturnValueOnce(4);
    const result = calculate(1, 1);
    expect(result).toBe(4);
    expect(addMock).toHaveBeenCalledWith(1, 1);
  });
});

