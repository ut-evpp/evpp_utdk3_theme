<?php

namespace Drupal\evpp_utdk3_theme;

use Drupal\Core\Render\Element\RenderCallbackInterface;

/**
 * Defines a class for EVPP Theme theme render callback functions.
 */
class FortyAcresRenderCallback implements RenderCallbackInterface {

  /**
   * Return values for the breadcrumb title placeholder.
   *
   * @param string $page_title
   *   The placeholder object for the page title.
   *
   * @return array
   *   A render array.
   */
  public static function lazyBuilder($page_title) {
    $request = \Drupal::request();
    $route_match = \Drupal::routeMatch();
    if ($route_match !== NULL) {
      $title = \Drupal::service('title_resolver')->getTitle($request, $route_match->getRouteObject());
      if (!is_array($title)) {
        $title = [
          '#type' => 'markup',
          '#markup' => $title,
        ];
      }
      return $title;
    }
    return $page_title;
  }

}
