<?php
header("Access-Control-Allow-Origin: *");
$id = isset($_GET["id"]) ? $_GET["id"] : '';
// 连主库
$conn = mysqli_connect('w.rdc.sae.sina.com.cn' . ':' . '3306', 'kzl3w535lm', '1313mzj34mi1x05z5k3imj1k2j13m2w2hykl1ziz', 'app_jxjweb');
// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
$sql = "SELECT * FROM `2code_code` WHERE id = '" . $id . "'";
$result = $conn->query($sql);
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        if (!strpos($row["content"], "//")) {
            $k = "//" . $row["content"];
        } else {
            $k = $row["content"];
        }
        $v=$row["num"]+1;
$sql = "UPDATE `app_jxjweb`.`2code_code` SET `num` = '".$v."' WHERE `2code_code`.`id` = '".$id."'";
$result2 = $conn->query($sql);
        Header("HTTP/1.1 303 See Other");
        Header("Location: $k");
    }
} else {
    exit('错误路径!');
}
// Header("Location:$result");

?>

