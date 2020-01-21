<?php
/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-01-25 13:29:44
 * @LastEditTime: 2020-01-21 10:57:39
 * @LastEditors: 靳肖健
 */
// 连主库
include 'conn_sql.php';


$id = isset($_GET["id"]) ? $_GET["id"] : '';


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
$sql = "UPDATE `2code_code` SET `num` = '".$v."' WHERE `2code_code`.`id` = '".$id."'";
$result2 = $conn->query($sql);
        Header("HTTP/1.1 303 See Other");
        Header("Location: $k");
    }
} else {
    exit('错误路径!');
}
// Header("Location:$result");

?>

