describe("basic jest examples", () => {
  it("determines whether two values are the same value", () => {
    expect("bratislava").toBe("bratislava");
  });

  it("determines whether two objects/arrays are same", () => {
    const towns = ["kosice", "bratislava", "bystrica"].sort();
    expect(towns).toEqual(["bratislava", "bystrica", "kosice"]);
    expect(towns).toContain("bratislava");
  });

  it("determines whether value is valid email address", () => {
    expect("test@email.com").toMatch(
      /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    );
  });

  it("fails", () => {
    expect(fail).toThrow();
  });

  it("in not fails", () => {
    jest.spyOn(global.console, "error").mockImplementation(() => {});
    expect(notFail).not.toThrow();
  });

  it("checks truthiness", () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  function fail() {
    throw new Error("Nasty error");
  }

  function notFail() {
    try {
      fail();
    } catch (error) {
      console.error(error);
    }
  }
});

describe("testing async", () => {
  // Don't do this!
  it(
    "is slivkovy lekvar",
    done => {
      function callback(data) {
        expect(data).toBe("slivkovy lekvar");
        done();
      }

      fetchData(callback);
    },
    10 // tiemout (default is 5000)
  );

  it("is more slivkovy lekvar", () => {
    return fetchDataPromise().then(data => {
      expect(data).toBe("slivkovy lekvar");
    });
  });

  it("is much more slivkovy lekvar", async () => {
    const data = await fetchDataPromise();
    expect(data).toBe("slivkovy lekvar");
  });
});

function fetchData(callback) {
  setTimeout(() => {
    callback("slivkovy lekvar");
  }, 1);
}

function fetchDataPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("slivkovy lekvar");
    }, 1);
  });
}
