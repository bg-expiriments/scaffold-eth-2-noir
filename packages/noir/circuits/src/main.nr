fn is_not_equal(x : Field, y : Field) -> bool {
    x != y
}

fn main(x : Field, y : pub Field) {
    assert(is_not_equal(x, y));
}

#[test]
fn test_main() {
    main(1, 2);
    main(2, 1);
    // TODO: is there a way to test that main fails without actually having it return a bool?
}

#[test]
fn test_is_not_equal() {
    let res2 = is_not_equal(1, 1);
    assert(res2 == false);
}
